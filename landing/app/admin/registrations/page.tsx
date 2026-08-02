import { format } from "date-fns"
import { getWaitlistStats, listWaitlistEntries } from "@/lib/waitlist"

export const dynamic = "force-dynamic"

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border px-5 py-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-extrabold tracking-tight">
        {value.toLocaleString()}
      </p>
    </div>
  )
}

export default async function AdminRegistrationsPage() {
  let stats = { total: 0, today: 0, last7Days: 0 }
  let entries: Awaited<ReturnType<typeof listWaitlistEntries>> = []
  let error: string | null = null

  try {
    ;[stats, entries] = await Promise.all([
      getWaitlistStats(),
      listWaitlistEntries(),
    ])
  } catch (err) {
    console.error("Failed to load waitlist admin data:", err)
    error = "Could not load registrations. Check DATABASE_URL and try again."
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight">
            Registrations
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Waitlist submissions from the “Start your store” form.
          </p>
        </div>
      </div>

      {error ? (
        <p className="mt-8 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <StatCard label="Total submissions" value={stats.total} />
            <StatCard label="Today" value={stats.today} />
            <StatCard label="Last 7 days" value={stats.last7Days} />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-border">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="border-b border-border bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Submitted</th>
                    <th className="px-4 py-3 font-semibold">Name</th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Store name</th>
                    <th className="px-4 py-3 font-semibold">Website</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-muted-foreground"
                      >
                        No registrations yet.
                      </td>
                    </tr>
                  ) : (
                    entries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-border last:border-0"
                      >
                        <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                          {format(new Date(entry.createdAt), "MMM d, yyyy HH:mm")}
                        </td>
                        <td className="px-4 py-3 font-medium">{entry.name}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`mailto:${entry.email}`}
                            className="text-primary underline-offset-2 hover:underline"
                          >
                            {entry.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">{entry.storeName}</td>
                        <td className="px-4 py-3">
                          {entry.website ? (
                            <a
                              href={entry.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-primary underline-offset-2 hover:underline"
                            >
                              {entry.website.replace(/^https?:\/\//i, "")}
                            </a>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {entries.length > 0 ? (
            <p className="mt-4 text-xs text-muted-foreground">
              Showing {entries.length.toLocaleString()} most recent
              {stats.total > entries.length
                ? ` of ${stats.total.toLocaleString()}`
                : ""}{" "}
              submissions.
            </p>
          ) : null}
        </>
      )}
    </div>
  )
}
