import React from 'react'

export const formatDate = (date) => {
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export const dateFormatter = (dateString) => {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "Invalid Date";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${month}-${day}-${year}`;
  return formattedDate
}

export const getInitials = (fullName) => {
  const names = fullName?.split(" ");
  const initials = names?.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials?.join("");

  return initialsStr;
}

export const PRIORITY_STYLES = {
  high: "text-red-600",
  medium: "text-yellow-600",
  low: "text-blue-600",
  normal: "text-fuchsia-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];

export const BGSU = [
  "bg-slate-600",
  "bg-gray-600",
  "bg-zinc-600",
  "bg-neutral-600",
  "bg-stone-600",
  "bg-red-600",
  "bg-orange-600",
  "bg-amber-600",
  "bg-yellow-600",
  "bg-lime-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-teal-600",
  "bg-cyan-600",
  "bg-sky-600",
  "bg-blue-600",
  "bg-indigo-600",
  "bg-violet-600",
  "bg-purple-600",
  "bg-fuchsia-600",
  "bg-pink-600",
  "bg-rose-600",
]

export const bgColor = {
  high: "bg-red-200",
  medium: "bg-yellow-200",
  low: "bg-blue-200",
};

export const LISTS = ["TODO", "IN PROGRESS", "COMPLETED"];
export const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
