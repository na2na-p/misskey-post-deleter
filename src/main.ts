import { api } from 'misskey-js';
import 'dotenv/config';
import { program } from 'commander';

import { DeleteAllPostsCommand } from '@/commands/DeleteAllPostsCommand/index.js';
import { getConfig } from '@/config/index.js';

const config = getConfig();

const client = new api.APIClient({
  origin: config.BASE_URL,
  credential: config.API_KEY,
});

program
  .command('delete-all <userId>')
  .description('Delete all posts of a specified user ID')
  .option('-f, --frozen', 'Freeze the account as well')
  .action((userId, options) => {
    const command = new DeleteAllPostsCommand({
      userId,
      freeze: options.frozen,
      client,
    });
    command.execute();
  });

program.parse(process.argv);
