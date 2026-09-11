import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export interface TeamMemberInput {
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  displayOrder?: number;
}

export async function getAllTeamMembers() {
  return await prisma.teamMember.findMany({
    orderBy: { displayOrder: "asc" },
  });
}

export async function createTeamMember(data: TeamMemberInput) {
  const member = await prisma.teamMember.create({
    data: {
      name: data.name,
      role: data.role,
      bio: data.bio,
      avatarUrl: data.avatarUrl,
      linkedinUrl: data.linkedinUrl,
      displayOrder: data.displayOrder ?? 0,
    },
  });

  revalidatePath("/team");
  revalidatePath("/");
  return member;
}

export async function deleteTeamMember(id: string) {
  const deleted = await prisma.teamMember.delete({ where: { id } });
  revalidatePath("/team");
  revalidatePath("/");
  return deleted;
}
