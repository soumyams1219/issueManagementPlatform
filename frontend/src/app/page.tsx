"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "../services/api";
import { Issue } from "../types/issue";

export default function Home() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<Issue[]>([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

 

  const fetchIssues = async () => {
  try {
    setLoading(true);
    const response = await api.get("/issues");
    setIssues(response.data);
    setFilteredIssues(response.data);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
 useEffect(() => {
    fetchIssues();
  }, []);
useEffect(() => {
  let filtered = [...issues];

  if (statusFilter !== "All") {
    filtered = filtered.filter(
      (issue) => issue.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  if (priorityFilter !== "All") {
    filtered = filtered.filter(
      (issue) => issue.priority.toLowerCase() === priorityFilter.toLowerCase()
    );
  }

  if (search.trim()) {
    filtered = filtered.filter((issue) =>
      issue.title.toLowerCase().includes(search.toLowerCase())
    );
  }

  setFilteredIssues(filtered);
}, [statusFilter, priorityFilter, search, issues]);

if (loading) {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <p className="text-gray-500">Loading issues...</p>
    </main>
  );
}
  return (
    <main className="max-w-5xl mx-auto p-8">
      
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-4xl font-bold">
            Issue Management Platform
          </h1>

          <p className="text-gray-500 mt-2">
            Manage issues, discussions and AI-powered analysis
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Total Issues: {issues.length}
          </p>
        </div>

        <Link
          href="/issues/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create Issue
        </Link>
      </div>

<div className="flex flex-col md:flex-row gap-3 mb-6">

  {/* Search */}
  <input
    type="text"
    placeholder="Search issues..."
    className="border p-2 rounded w-full"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  {/* Status Filter */}
  <select
    className="border p-2 rounded"
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Status</option>
<option value="open">Open</option>
<option value="in progress">In Progress</option>
<option value="closed">Closed</option>
  </select>

  {/* Priority Filter */}
  <select
    className="border p-2 rounded"
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
  >
    <option value="all">All Priority</option>
<option value="high">High</option>
<option value="medium">Medium</option>
<option value="low">Low</option>
  </select>
<button
  onClick={() => {
    setSearch("");
    setStatusFilter("All");
    setPriorityFilter("All");
  }}
  className="text-sm text-blue-600"
>
  Clear Filters
</button>
</div>
      {/* EMPTY STATE */}
      {!loading && filteredIssues.length === 0 && (
        <div className="border rounded-xl p-8 text-center text-gray-500">
          No issues available. Create your first issue.
        </div>
      )}

      {/* ISSUE LIST */}
      <div className="space-y-4">
        {filteredIssues.map((issue) => (
          <Link
            key={issue.id}
            href={`/issues/${issue.id}`}
            className="block"
          >
            <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer">
              <h2 className="font-semibold text-lg">
                {issue.title}
              </h2>

              <p className="text-gray-600 mt-2 line-clamp-2">
                {issue.description}
              </p>

              <div className="flex gap-2 mt-3">
                <span className="px-3 py-1 bg-green-100 rounded-full text-sm">
                  {issue.status}
                </span>

                <span className="px-3 py-1 bg-red-100 rounded-full text-sm">
                  {issue.priority}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}