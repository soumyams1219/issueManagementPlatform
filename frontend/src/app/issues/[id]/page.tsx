"use client";

import { useEffect, useState, use } from "react";
import api from "../../../services/api";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function IssueDetailsPage({ params }: PageProps) {
  // ✅ Correct way in latest Next.js
  const resolvedParams = use(params);
  const issueId = resolvedParams.id;

  const [issue, setIssue] = useState<any>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    if (issueId) {
      fetchIssue();
    }
  }, [issueId]);

  const fetchIssue = async () => {
    try {
      const issueResponse = await api.get(`/issues/${issueId}`);
      setIssue(issueResponse.data);
      setAnalysis(issueResponse.data.analysis || "");

      const discussionResponse = await api.get(
        `/issues/${issueId}/discussions`
      );

      setDiscussions(discussionResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addDiscussion = async () => {
    if (!message.trim()) return;

    try {
      await api.post(`/issues/${issueId}/discussions`, {
        message,
      });

      setMessage("");
      fetchIssue();
    } catch (error) {
      console.error(error);
    }
  };

  const generateAnalysis = async () => {
    try {
      setLoadingAnalysis(true);

      const response = await api.post(`/issues/${issueId}/analyze`);

      setAnalysis(response.data.analysis);
      await fetchIssue();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAnalysis(false);
    }
  };

  if (!issue) {
    return (
      <div className="p-8 text-gray-500">
        Loading issue details...
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">
        {issue.title}
      </h1>

      <p className="mb-4 text-gray-700">
        {issue.description}
      </p>

      <div className="flex gap-2 mb-6">
        <span className="px-3 py-1 rounded bg-blue-100 text-sm">
          Status: {issue.status}
        </span>

        <span className="px-3 py-1 rounded bg-red-100 text-sm">
          Priority: {issue.priority}
        </span>
      </div>

      {/* Discussions */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Discussions
        </h2>

        <div className="space-y-3 mb-4">
          {discussions.map((discussion) => (
            <div
              key={discussion.id}
              className="border rounded p-3 bg-gray-50"
            >
              {discussion.message}
            </div>
          ))}
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add discussion..."
          className="w-full border p-3 rounded"
          rows={3}
        />

        <button
          onClick={addDiscussion}
          className="mt-3 bg-green-600 text-white px-4 py-1 text-sm rounded hover:bg-green-700"
        >
          Add Discussion
        </button>
      </div>

      {/* AI Analysis */}
      <div className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            AI Analysis
          </h2>

          <button
            onClick={generateAnalysis}
            disabled={loadingAnalysis}
            className="bg-purple-600 text-white px-4 py-1 text-sm rounded hover:bg-purple-700 disabled:opacity-50"
          >
            {loadingAnalysis ? "Generating..." : "Generate Analysis"}
          </button>
        </div>

        <div className="border rounded p-4 whitespace-pre-wrap bg-white">
          {analysis || "No analysis generated yet."}
        </div>
      </div>
    </main>
  );
}