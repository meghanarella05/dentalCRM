type RoleUser = {
  role?: {
    name?: string;
  };
};

export function requireRole(...allowed: string[]) {
  return (_req: Request, user: RoleUser) => {
    if (!user?.role?.name || !allowed.includes(user.role.name)) {
      throw new Error("403");
    }
  };
}
