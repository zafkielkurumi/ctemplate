import { strings } from '@angular-devkit/core';
import { apply, applyTemplates, chain, filter, mergeWith, move, noop, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { parseName } from '../utils/parseName';
import { validateName } from '../utils/validate';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function flutter(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const parsedPath = parseName(tree.root.path, options.name);
    options.name = parsedPath.name;
    validateName(options.name);
    const templateSource = apply(url("./files"), [
      applyTemplates({
        ...strings,
        ...options,
      }),
      move(tree.root.path),
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
