// env.d.ts
declare interface NavItemChild {
  label: string
  route: string
}

declare interface NavItem {
  label: string
  children?: NavItemChild[]
}

declare interface DropdownComponent {
  handleClose: () => void
}
