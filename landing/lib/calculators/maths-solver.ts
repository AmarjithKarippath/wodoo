export type MathsSolverResult = {
  result: number
  expression: string
}

/** Safe arithmetic evaluator for + - * / % ^ and parentheses. */
export function solveMathExpression(expression: string): MathsSolverResult | null {
  const cleaned = expression.replace(/\s+/g, "")
  if (!cleaned || cleaned.length > 200) return null
  if (!/^[0-9+\-*/%^().]+$/.test(cleaned)) return null

  try {
    const tokens = tokenize(cleaned)
    const rpn = toRpn(tokens)
    const result = evalRpn(rpn)
    if (!Number.isFinite(result)) return null
    return { result, expression: cleaned }
  } catch {
    return null
  }
}

function tokenize(expr: string): string[] {
  const tokens: string[] = []
  let i = 0
  while (i < expr.length) {
    const ch = expr[i]
    if ("+-*/%^()".includes(ch)) {
      // unary minus
      if (
        ch === "-" &&
        (tokens.length === 0 ||
          ["+", "-", "*", "/", "%", "^", "("].includes(tokens[tokens.length - 1]))
      ) {
        let j = i + 1
        let num = "-"
        while (j < expr.length && /[0-9.]/.test(expr[j])) {
          num += expr[j]
          j++
        }
        if (num === "-") throw new Error("bad unary")
        tokens.push(num)
        i = j
        continue
      }
      tokens.push(ch)
      i++
      continue
    }
    if (/[0-9.]/.test(ch)) {
      let j = i
      let num = ""
      while (j < expr.length && /[0-9.]/.test(expr[j])) {
        num += expr[j]
        j++
      }
      tokens.push(num)
      i = j
      continue
    }
    throw new Error("bad char")
  }
  return tokens
}

function precedence(op: string): number {
  if (op === "+" || op === "-") return 1
  if (op === "*" || op === "/" || op === "%") return 2
  if (op === "^") return 3
  return 0
}

function toRpn(tokens: string[]): string[] {
  const output: string[] = []
  const stack: string[] = []
  for (const t of tokens) {
    if (/^-?\d+(\.\d+)?$/.test(t)) {
      output.push(t)
    } else if (t === "(") {
      stack.push(t)
    } else if (t === ")") {
      while (stack.length && stack[stack.length - 1] !== "(") {
        output.push(stack.pop()!)
      }
      if (!stack.length) throw new Error("paren")
      stack.pop()
    } else {
      while (
        stack.length &&
        stack[stack.length - 1] !== "(" &&
        precedence(stack[stack.length - 1]) >= precedence(t) &&
        t !== "^"
      ) {
        output.push(stack.pop()!)
      }
      stack.push(t)
    }
  }
  while (stack.length) {
    const op = stack.pop()!
    if (op === "(" || op === ")") throw new Error("paren")
    output.push(op)
  }
  return output
}

function evalRpn(rpn: string[]): number {
  const stack: number[] = []
  for (const t of rpn) {
    if (/^-?\d+(\.\d+)?$/.test(t)) {
      stack.push(Number(t))
      continue
    }
    const b = stack.pop()
    const a = stack.pop()
    if (a === undefined || b === undefined) throw new Error("stack")
    switch (t) {
      case "+":
        stack.push(a + b)
        break
      case "-":
        stack.push(a - b)
        break
      case "*":
        stack.push(a * b)
        break
      case "/":
        stack.push(a / b)
        break
      case "%":
        stack.push(a % b)
        break
      case "^":
        stack.push(Math.pow(a, b))
        break
      default:
        throw new Error("op")
    }
  }
  if (stack.length !== 1) throw new Error("stack")
  return stack[0]
}
