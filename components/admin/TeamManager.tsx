"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { saveTeamMemberAction, deleteTeamMemberAction } from "@/app/actions/team";
import {
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  X,
  Loader2,
  AlertCircle,
  Users,
  Linkedin,
  UploadCloud,
  Image as ImageIcon,
} from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl: string | null;
  linkedinUrl: string | null;
  displayOrder: number;
}

export default function TeamManager({ initialTeam }: { initialTeam: TeamMember[] }) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMember | null>(null);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");

  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setError(null);

    try {
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to upload image");
      }

      setAvatarUrl(json.url);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Image upload failed";
      setError(msg);
    } finally {
      setUploadingImage(false);
    }
  };

  const openNewModal = () => {

    setEditingItem(null);
    setName("");
    setRole("");
    setBio("");
    setAvatarUrl("");
    setLinkedinUrl("");
    setDisplayOrder("0");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (item: TeamMember) => {
    setEditingItem(item);
    setName(item.name);
    setRole(item.role);
    setBio(item.bio);
    setAvatarUrl(item.avatarUrl || "");
    setLinkedinUrl(item.linkedinUrl || "");
    setDisplayOrder(item.displayOrder.toString());
    setError(null);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (editingItem) formData.append("id", editingItem.id);
    formData.append("name", name);
    formData.append("role", role);
    formData.append("bio", bio);
    formData.append("avatarUrl", avatarUrl);
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("displayOrder", displayOrder);

    const res = await saveTeamMemberAction(formData);
    setLoading(false);

    if (res.success) {
      setModalOpen(false);
      router.refresh();
    } else {
      setError(res.error || "Failed to save team member.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    setLoading(true);
    const res = await deleteTeamMemberAction(id);
    setLoading(false);
    if (res.success) {
      router.refresh();
    } else {
      alert(res.error || "Failed to delete");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-red-50 text-brand-red rounded-lg">
              <Users className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-black text-brand-navy">Team & Education Counselors</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified education advisors, visa documentation officers, and branch counselors across Kathmandu and Birgunj.
          </p>
        </div>
        <button
          onClick={openNewModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-brand-red hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialTeam.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-slate-200 p-8 text-slate-500 text-sm">
            No team members added yet. Click <span className="font-bold text-brand-red">&quot;Add Member&quot;</span> to add counselor profiles!
          </div>
        ) : (
          initialTeam.map((member) => (
            <div
              key={member.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 hover:shadow-md transition relative flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {member.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-brand-navy text-white font-bold flex items-center justify-center text-base">
                        {member.name[0]}
                      </div>
                    )}
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">{member.name}</h2>
                      <span className="text-xs font-semibold text-brand-red block">{member.role}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      onClick={() => openEditModal(member)}
                      title="Edit Member"
                      className="p-1.5 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg transition"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(member.id)}
                      title="Delete Member"
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {member.bio}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">
                  Order: #{member.displayOrder}
                </span>
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-navy hover:text-brand-red inline-flex items-center space-x-1 text-xs font-semibold"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <span>LinkedIn</span>
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-100 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-brand-navy">
                {editingItem ? "Edit Counselor Profile" : "Add Team Member"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Shrestha"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior UK & Europe Counselor"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Professional Bio *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Detail experience, destination countries covered, certifications, and student counseling milestones..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Counselor Photo / Avatar</label>
                <div className="flex items-start gap-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  {avatarUrl ? (
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-brand-red flex-shrink-0 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setAvatarUrl("")}
                        title="Remove image"
                        className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-white border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 flex-shrink-0">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 bg-brand-navy hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition disabled:opacity-50">
                        {uploadingImage ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <UploadCloud className="w-3.5 h-3.5" />
                        )}
                        <span>{uploadingImage ? "Uploading..." : "Upload Image"}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingImage}
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                      {avatarUrl && (
                        <button
                          type="button"
                          onClick={() => setAvatarUrl("")}
                          className="text-xs text-rose-600 hover:underline font-medium"
                        >
                          Remove Photo
                        </button>
                      )}
                    </div>
                    <input
                      type="text"
                      placeholder="Or paste external image URL (https://...)"
                      value={avatarUrl}
                      onChange={(e) => setAvatarUrl(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-navy"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    min="0"
                    value={displayOrder}
                    onChange={(e) => setDisplayOrder(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>


                <div>
                  <label className="block font-bold text-slate-700 mb-1">LinkedIn Profile URL</label>
                  <input
                    type="text"
                    placeholder="https://linkedin.com/in/..."
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-navy"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-2 px-5 py-2 bg-brand-navy hover:bg-slate-800 text-white rounded-xl font-bold transition disabled:opacity-50"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                  <span>{editingItem ? "Update Counselor" : "Create Profile"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
