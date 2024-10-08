import { jobTypes, locationTypes } from "@/lib/job-types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Select from "./ui/select";
import prisma from "@/lib/prisma"
import { Button } from "./ui/button";
import { jobFilterSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

async function filterJobs(formData: FormData) {
  "use server";
    const values = Object.fromEntries(formData.entries())
    const {q,type,location,remote} = jobFilterSchema.parse(values)

    const searchParams = new URLSearchParams({
        ...(q && {q: q.trim()} ),
        ...(type && {type} ),
        ...(location && {location} ),
        ...(remote && {remote:"true"} ),
    })

    redirect(`/?${searchParams.toString()}`)
}

export default async function JobFilterSideBar() {
    const distinctLocations = (await prisma.job.findMany({
        where: {approved: true},
        select:{location:true},
        distinct: ["location"]
    }).then((locations)=>(
        locations.map(({location})=> location).filter(Boolean)
    )))as String[] 
  return (
    <aside className="md-w-[260px] p-4 sticky top-0 h-fit bg-background border rounded-lg">
      <form action={filterJobs}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input name="q" id="q" placeholder="Title, Company. etc..." />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">
                Type
            </Label>
            <Select id="type" name="type" defaultValue="">
                <option value="">All Types</option>
                {jobTypes.map((type)=>(
                    <option key={type} value={type}>{type}</option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location"></Label>
            <Select id="location" name="location" defaultValue="">
                <option value="">All Locations</option>
                {distinctLocations.map((location)=>(
                    <option key={location} value={location}>{location}</option>
                ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location_type">
                Location
            </Label>
            <Select id="location_type" name="location_type" defaultValue="">
                <option value="">All Location Types</option>
                {locationTypes.map((loc_type)=>(
                    <option key={loc_type} value={loc_type}>{loc_type}</option>
                ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remote" name="remote" className="scale-125 accent-black" />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <Button type="submit" className="w-full">Filter Jobs</Button>
        </div>
      </form>
    </aside>
  );
}
