export interface IProps {
  pull: <T> (key: string) => T
  define: <T> (key: string, value: T) => void
}
