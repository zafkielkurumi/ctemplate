import { experimental } from '@angular-devkit/core';
import { Rule, SchematicContext, SchematicsException, Tree } from '@angular-devkit/schematics';

import { validateName } from '../utils/validate';
import { parseName } from '../utils/parseName';
import { Schema } from './schema';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function ngTest(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const parsedPath = parseName(options.path, options.name, true);
    options.name = parsedPath.name;
    validateName(options.name);

    const workspaceConfig = tree.read('/angular.json');
    if (!workspaceConfig) {
      throw new SchematicsException('Could not find Angular workspace configuration');
    }

    // convert workspace to string
    const workspaceContent = workspaceConfig.toString();

    // parse workspace string into JSON object
    const workspace: experimental.workspace.WorkspaceSchema = JSON.parse(workspaceContent);
    console.log(workspace)
    return tree;
  };
}
