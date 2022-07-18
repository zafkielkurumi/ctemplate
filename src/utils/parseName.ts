import { Path, basename, dirname, join, normalize } from "@angular-devkit/core";
import { strings } from "@angular-devkit/core";

export interface Location {
  name: string;
  path: Path;
}

export function parseName(path: string, name: string, isNg = false, formate?: string): Location {
  const nameWithoutPath = basename(normalize(name));
  if (formate) {
    name = ((strings as any)[formate] as any)?.(name);
  }
  strings.classify
  let namePath = join(normalize(path), name);
  if (isNg) {
    namePath = dirname(join(normalize(path), name) as Path);
  }
  return {
    name: strings.camelize(nameWithoutPath),
    path: namePath,
  };
}
