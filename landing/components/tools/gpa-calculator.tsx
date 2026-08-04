"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Field, ResultPanel, StatGrid } from "@/components/tools/calc-ui"
import { calculateGpa } from "@/lib/calculators/gpa"
import { formatNumber } from "@/lib/calculators/format"

type Row = { id: number; credits: string; gradePoints: string }

export function GpaCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, credits: "3", gradePoints: "9" },
    { id: 2, credits: "4", gradePoints: "8" },
    { id: 3, credits: "3", gradePoints: "7" },
  ])

  const result = useMemo(
    () =>
      calculateGpa(
        rows.map((r) => ({
          credits: Number(r.credits),
          gradePoints: Number(r.gradePoints),
        })),
      ),
    [rows],
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        {rows.map((row, index) => (
          <form
            key={row.id}
            className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]"
            onSubmit={(e) => e.preventDefault()}
          >
            <Field id={`gpa-c-${row.id}`} label={`Course ${index + 1} credits`}>
              <Input
                id={`gpa-c-${row.id}`}
                type="number"
                min="0.5"
                step="0.5"
                value={row.credits}
                onChange={(e) =>
                  setRows((prev) =>
                    prev.map((r) => (r.id === row.id ? { ...r, credits: e.target.value } : r)),
                  )
                }
              />
            </Field>
            <Field id={`gpa-g-${row.id}`} label="Grade points (0–10)">
              <Input
                id={`gpa-g-${row.id}`}
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={row.gradePoints}
                onChange={(e) =>
                  setRows((prev) =>
                    prev.map((r) =>
                      r.id === row.id ? { ...r, gradePoints: e.target.value } : r,
                    ),
                  )
                }
              />
            </Field>
            <div className="flex items-end">
              <Button
                type="button"
                variant="outline"
                disabled={rows.length <= 1}
                onClick={() => setRows((prev) => prev.filter((r) => r.id !== row.id))}
              >
                Remove
              </Button>
            </div>
          </form>
        ))}
        <Button
          type="button"
          variant="outline"
          onClick={() =>
            setRows((prev) => [
              ...prev,
              { id: Date.now(), credits: "3", gradePoints: "8" },
            ])
          }
        >
          Add course
        </Button>
      </div>
      {result ? (
        <ResultPanel title="GPA" value={formatNumber(result.gpa, 2)}>
          <StatGrid
            items={[
              { label: "GPA", value: formatNumber(result.gpa, 2) },
              { label: "Total credits", value: formatNumber(result.totalCredits, 1) },
              { label: "Quality points", value: formatNumber(result.qualityPoints, 1) },
              { label: "Courses", value: formatNumber(rows.length, 0) },
            ]}
          />
        </ResultPanel>
      ) : null}
    </div>
  )
}
