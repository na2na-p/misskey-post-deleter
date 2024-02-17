import type { api } from 'misskey-js';

export class BaseCommand {
  protected client: api.APIClient;
  constructor({ client }: { client: api.APIClient }) {
    this.client = client;
  }

  async execute() {
    throw new Error('execute method must be implemented by subclasses');
  }

  handleError(error: Error) {
    // eslint-disable-next-line no-console
    console.error(`An error occurred: ${error.message}`);
    process.exit(1);
  }
}
