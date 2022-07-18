import { strings } from "@angular-devkit/core";
import {
  apply,
  template,
  applyTemplates,
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  Tree,
  url,
  filter,
  noop,
  move,
  formats
} from "@angular-devkit/schematics";
import { Schema } from "./schema";
import { validateName } from "../utils/validate";
import { parseName } from "../utils/parseName";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function vue(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const formate = options.formateName;
    const parsedPath = parseName(tree.root.path, options.name, false, formate);
    options.name = parsedPath.name;
   
    validateName(options.name);
    const templateSource = apply(url("./files"), [
      options.style === "none"
        ? filter((path) => !path.endsWith("__style__.template"))
        : noop(),
      options.target !== 'vue3ts' ? filter((path) => !path.endsWith("ts.template"))
      : noop(),
      filter(path => path.includes(formate)),
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(parsedPath.path),
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
