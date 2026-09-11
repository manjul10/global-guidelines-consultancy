"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteArticleAction } from "@/app/actions/articles";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteArticleButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Are you sure you want to permanently delete this article?")) {
      return;
    }

    setLoading(true);
    await deleteArticleAction(id);
    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
      title="Delete Article"
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-rose-500" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
