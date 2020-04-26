export function convertDate<T>(obj: { date: string }): { date: Date } {
  return { ...obj, date: new Date(obj.date) }
}