export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-02-04'

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)
export const token = assertValue(
"skAzjmlwbfQ2TdAGs6EbUPgCRj3CHlMoVQi0hTCPADboVVcSFYLcxkfdCyj1d5qyo8C2ygjcSXrnIrefsg6ruBpyAqcXqsfQUXzZ8AbtEsjr1ya07OteYorFtYzpwE7cOKr34eE7wytgEpbdykkrtcG02E3AXcMmj1PFbEHVLtaHTQBXI6JD",
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_Token'
)
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
