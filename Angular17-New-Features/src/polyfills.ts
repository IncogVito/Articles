if (!(Symbol as any).metadata) {
  (Symbol as any).metadata = Symbol.for("Symbol.metadata");
}
