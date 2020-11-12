import { apply, applyTemplates, chain, mergeWith, move, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { strings } from "@angular-devkit/core";

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngCore(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url("./files"), [
      applyTemplates({
        ...strings,
      }),
      move('/core')
    ]);
    return chain([mergeWith(templateSource)]);
  };
}
