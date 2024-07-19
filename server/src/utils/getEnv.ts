export function getEnv(name: string) {
  if (typeof process.env[name] === 'undefined') {
    throw new Error(`Variable ${name} undefined.`)
  }

  return process.env[name]
}
