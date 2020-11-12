import { Path, basename, dirname, join, normalize } from "@angular-devkit/core";

export interface Location {
  name: string;
  path: Path;
}

export function parseName(path: string, name: string, isNg = false): Location {
  const nameWithoutPath = basename(normalize(name));

  let namePath = join(normalize(path), name);
  if (isNg) {
    namePath = dirname(join(normalize(path), name) as Path);
  }
  return {
    name: nameWithoutPath,
    path: normalize("/" + namePath),
  };
}
