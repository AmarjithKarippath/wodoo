export type LegalDocType =
  | "operating-agreement"
  | "articles-of-organization"
  | "bylaws"

export type LegalDocInput = {
  docType: LegalDocType
  companyName: string
  state: string
  memberNames: string
  effectiveDate: string
  principalAddress: string
  purpose: string
}

export function generateLegalDocument(input: LegalDocInput): string {
  const company = input.companyName.trim() || "[COMPANY NAME]"
  const state = input.state.trim() || "[STATE]"
  const members = input.memberNames.trim() || "[MEMBER / SHAREHOLDER NAMES]"
  const date = input.effectiveDate.trim() || "[EFFECTIVE DATE]"
  const address = input.principalAddress.trim() || "[PRINCIPAL ADDRESS]"
  const purpose =
    input.purpose.trim() ||
    "to engage in any lawful business activity permitted under applicable law"

  if (input.docType === "operating-agreement") {
    return `LIMITED LIABILITY COMPANY OPERATING AGREEMENT
of
${company}

This Operating Agreement is entered into as of ${date}, by and among the Member(s) listed below (the "Members") of ${company}, a limited liability company to be formed / existing under the laws of the State of ${state}.

1. FORMATION AND NAME
The company shall be known as ${company} and shall maintain its principal place of business at ${address}.

2. PURPOSE
The purpose of the Company is ${purpose}.

3. MEMBERS
The Members of the Company are: ${members}.
Unless otherwise agreed in writing, ownership and voting interests shall be allocated equally among the Members, or as separately scheduled by the Members.

4. MANAGEMENT
The Company shall be member-managed unless the Members elect manager-management in a written amendment. Members shall have authority to bind the Company in the ordinary course of business.

5. CAPITAL CONTRIBUTIONS
Initial capital contributions shall be recorded in the Company's books. Additional contributions require Member approval.

6. DISTRIBUTIONS
Distributions of available cash shall be made at such times and in such amounts as the Members determine, subject to applicable law and creditor obligations.

7. BOOKS AND RECORDS
The Company shall maintain complete books and records at its principal office and provide Members reasonable access.

8. DISSOLUTION
The Company may be dissolved upon the written consent of the Members or as otherwise provided by ${state} law.

9. GOVERNING LAW
This Agreement shall be governed by the laws of the State of ${state}.

DISCLAIMER: This is a free starter template for educational purposes and is not legal advice. Have a licensed attorney review before use.

Signed as of ${date}.

Member signatures:
${members
  .split(",")
  .map((m) => `\n______________________________\n${m.trim()}`)
  .join("\n")}`
  }

  if (input.docType === "articles-of-organization") {
    return `ARTICLES OF ORGANIZATION
(Draft filing outline for ${company})

1. Name of Limited Liability Company: ${company}
2. State of Formation: ${state}
3. Principal Office Address: ${address}
4. Effective Date: ${date}
5. Registered Agent: [REGISTERED AGENT NAME AND ADDRESS IN ${state}]
6. Management Structure: Member-managed / Manager-managed (select one)
7. Members / Organizers: ${members}
8. Purpose: ${purpose}
9. Duration: Perpetual, unless sooner dissolved under ${state} law

FILING NOTES
- Confirm name availability with the ${state} Secretary of State before filing.
- Attach any required formation fee and registered-agent consent.
- Some states require publication or additional initial reports after filing.

DISCLAIMER: This draft outline is not an official filing form. Use your state's official Articles of Organization / Certificate of Formation form.`
  }

  return `CORPORATE BYLAWS
of
${company}

Adopted as of ${date}

ARTICLE I — OFFICES
The principal office of the Corporation shall be located at ${address}, or at such other place as the Board of Directors may designate.

ARTICLE II — PURPOSE
The Corporation is organized under the laws of ${state} for the purpose of ${purpose}.

ARTICLE III — SHAREHOLDERS
Shareholders of record are: ${members}.
Meetings of shareholders shall be held annually, and special meetings may be called by the Board or as allowed by ${state} law.

ARTICLE IV — BOARD OF DIRECTORS
The business of the Corporation shall be managed by a Board of Directors. Initial directors may be appointed by the incorporator(s) or shareholders.

ARTICLE V — OFFICERS
The officers of the Corporation may include a President, Secretary, and Treasurer, and such other officers as the Board appoints.

ARTICLE VI — RECORDS
The Corporation shall keep correct books and records of account and minutes of shareholder and board meetings.

ARTICLE VII — AMENDMENTS
These Bylaws may be amended by the Board of Directors or shareholders as permitted by ${state} law and the Articles of Incorporation.

DISCLAIMER: This is a free educational template, not legal advice. Customize and review with counsel before adoption.

Adopted as of ${date}.`
}
