import { Job } from "@prisma/client";
import Image from "next/image";
import CompanyLogoPlaceHolder from "@/assets/company-logo-placeholder.png";
import { Banknote, Briefcase, Clock, Globe2, MapPin } from "lucide-react";
import { types } from "util";
import { formatMoney, relativeDate } from "@/lib/utils";
import Badge from "./ui/Badge";

interface JobListItemProps {
  job: Job;
}
export default function JobListItem({
  job: {
    title,
    companyName,
    companyLogoUrl,
    type,
    location,
    locationType,
    salary,
    createdAt,
    updatedAt,
  },
}: JobListItemProps) {
  return (
    <article className="floex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || CompanyLogoPlaceHolder}
        alt=""
        width={100}
        height={100}
        className="rounded-lg self-center"
      />
      <div className="flex-grow space-y-3">
        <div className="">
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <MapPin size={16} className="shrink0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Globe2 size={16} className="shrink0" />
            {location||"worldwide"}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Banknote size={16} className="shrink0" />
            {formatMoney(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink0" />
            {relativeDate(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex flex-col shrink-0 items-end justify-between">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock size = {16} />
            {relativeDate(createdAt)}
        </span>
      </div>
    </article>
  );
}
