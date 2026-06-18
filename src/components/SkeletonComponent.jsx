import React from "react";

const AdminSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Header Section */}
      <div className="mb-6">
        <div className="h-8 w-48 border-border rounded-lg mb-3"></div>
        <div className="h-4 w-64 sm:w-96 border-border rounded-lg"></div>
      </div>

      {/* Filters Bar */}
      <div className="bg-secondary rounded-xl p-4 shadow-sm mb-6">
        <div className="flex justify-between items-center">
          <div className="flex-1 mr-4">
            <div className="h-10 w-full border-border rounded-xl"></div>
          </div>
          <div className="h-10 w-32 border-border rounded-xl"></div>
        </div>
      </div>

      {/* Content Grid/Table */}
      <div className="bg-secondary rounded-xl shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="border-b border-border bg-primary p-4">
          <div className="grid grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 border-border rounded"></div>
            ))}
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-border">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-4">
              <div className="grid grid-cols-6 gap-4">
                <div className="h-4 border-border rounded col-span-2"></div>
                <div className="h-4 border-border rounded"></div>
                <div className="h-4 border-border rounded"></div>
                <div className="h-4 border-border rounded"></div>
                <div className="h-8 border-border rounded w-20"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <div className="h-4 w-32 border-border rounded"></div>
        <div className="flex gap-2">
          <div className="h-9 w-9 border-border rounded"></div>
          <div className="h-9 w-9 border-border rounded"></div>
          <div className="h-9 w-9 border-border rounded"></div>
          <div className="h-9 w-9 border-border rounded"></div>
        </div>
      </div>
    </div>
  );
};

// Card View Skeleton
export const CardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-secondary rounded-xl shadow-sm p-4 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-border rounded-full"></div>
              <div>
                <div className="h-5 w-32 border-border rounded mb-2"></div>
                <div className="h-3 w-24 border-border rounded"></div>
              </div>
            </div>
            <div className="h-6 w-16 border-border rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 w-full border-border rounded"></div>
            <div className="h-3 w-3/4 border-border rounded"></div>
            <div className="h-3 w-1/2 border-border rounded"></div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-border">
            <div className="h-8 w-8 border-border rounded"></div>
            <div className="h-8 w-8 border-border rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ columns = 5 }) => {
  return (
    <div className="border-b border-border p-4 animate-pulse">
      <div className="grid grid-cols-5 gap-4">
        {[...Array(columns)].map((_, i) => (
          <div key={i} className="h-4 border-border rounded"></div>
        ))}
      </div>
    </div>
  );
};

// Form Skeleton
export const FormSkeleton = () => {
  return (
    <div className="space-y-3 animate-pulse">
      <div>
        <div className="h-4 w-24 border-border rounded mb-2"></div>
        <div className="h-10 w-full border-border rounded-lg"></div>
      </div>
      <div>
        <div className="h-4 w-24 border-border rounded mb-2"></div>
        <div className="h-10 w-full border-border rounded-lg"></div>
      </div>
      <div>
        <div className="h-4 w-24 border-border rounded mb-2"></div>
        <div className="h-24 w-full border-border rounded-lg"></div>
      </div>
      <div className="flex justify-end gap-3">
        <div className="h-10 w-24 border-border rounded-lg"></div>
        <div className="h-10 w-32 border-border rounded-lg"></div>
      </div>
    </div>
  );
};

// Modal Skeleton
export const ModalSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-48 border-border rounded mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 w-full border-border rounded"></div>
        <div className="h-4 w-3/4 border-border rounded"></div>
        <div className="h-4 w-1/2 border-border rounded"></div>
      </div>
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border">
        <div className="h-10 w-24 border-border rounded-lg"></div>
        <div className="h-10 w-32 border-border rounded-lg"></div>
      </div>
    </div>
  );
};

// Detail View Skeleton
export const DetailSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="mb-6 h-4 w-32 rounded-md bg-border" />
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-2xl bg-border" />
        <div className="flex-1 space-y-3">
          <div className="h-5 w-24 rounded-full bg-border" />
          <div className="h-8 w-64 max-w-full rounded-md bg-border" />
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 mb-6">
        <div className="h-16 rounded-xl bg-border" />
        <div className="h-16 rounded-xl bg-border" />
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-7">
          <div className="rounded-2xl border border-border bg-secondary p-6">
            <div className="mb-4 h-5 w-40 rounded-md bg-border" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-border" />
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-2xl border border-border bg-secondary p-6">
            <div className="mb-4 h-5 w-36 rounded-md bg-border" />
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 rounded-lg bg-border" />
              ))}
            </div>
            <div className="mt-4 h-24 rounded-xl bg-border" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const OrderCreateSkeleton = () => (
  <div className="mx-auto animate-pulse py-4 sm:py-6">
    <div className="mb-6 h-4 w-28 rounded-md bg-border" />
    <div className="mb-8 space-y-2">
      <div className="h-3 w-24 rounded-md bg-border" />
      <div className="h-8 w-72 max-w-full rounded-md bg-border" />
      <div className="h-4 w-96 max-w-full rounded-md bg-border" />
    </div>
    <div className="space-y-6 rounded-2xl border border-border bg-secondary p-6">
      <div className="space-y-2">
        <div className="h-4 w-20 rounded-md bg-border" />
        <div className="h-11 w-full rounded-xl bg-border" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-24 rounded-md bg-border" />
        <div className="h-11 w-full rounded-xl bg-border" />
      </div>
      <div className="border-t border-border pt-5">
        <div className="mb-4 h-4 w-40 rounded-md bg-border" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 w-28 rounded-md bg-border" />
              <div className="h-11 rounded-xl bg-border" />
            </div>
          ))}
        </div>
      </div>
      <div className="h-12 w-full rounded-xl bg-border" />
    </div>
  </div>
);

export const SessionsListSkeleton = () => (
  <div className="space-y-3 animate-pulse">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-4 rounded-xl border border-border bg-primary p-4">
        <div className="h-10 w-10 rounded-lg bg-border" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded-md bg-border" />
          <div className="h-3 w-56 rounded-md bg-border" />
        </div>
        <div className="h-8 w-16 rounded-lg bg-border" />
      </div>
    ))}
  </div>
);

export const HomeDashboardSkeleton = () => (
  <div className="mx-auto animate-pulse space-y-8">
    <div className="rounded-3xl border border-border bg-secondary p-6 sm:p-8">
      <div className="h-4 w-32 rounded-md bg-border" />
      <div className="mt-4 h-10 w-72 max-w-full rounded-lg bg-border" />
      <div className="mt-3 h-4 w-96 max-w-full rounded-md bg-border" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-32 rounded-2xl bg-border" />
      ))}
    </div>
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="h-80 rounded-2xl bg-border lg:col-span-3" />
      <div className="h-80 rounded-2xl bg-border lg:col-span-2" />
    </div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-64 rounded-2xl bg-border" />
      ))}
    </div>
  </div>
);

export default AdminSkeleton;