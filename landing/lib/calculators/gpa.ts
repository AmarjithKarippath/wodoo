export type GpaCourse = {
  credits: number
  gradePoints: number
}

export type GpaResult = {
  gpa: number
  totalCredits: number
  qualityPoints: number
}

export function calculateGpa(courses: GpaCourse[]): GpaResult | null {
  if (!courses.length) return null
  let totalCredits = 0
  let qualityPoints = 0
  for (const c of courses) {
    if (
      !Number.isFinite(c.credits) ||
      !Number.isFinite(c.gradePoints) ||
      c.credits <= 0 ||
      c.gradePoints < 0 ||
      c.gradePoints > 10
    ) {
      return null
    }
    totalCredits += c.credits
    qualityPoints += c.credits * c.gradePoints
  }
  if (totalCredits <= 0) return null
  return {
    gpa: qualityPoints / totalCredits,
    totalCredits,
    qualityPoints,
  }
}
