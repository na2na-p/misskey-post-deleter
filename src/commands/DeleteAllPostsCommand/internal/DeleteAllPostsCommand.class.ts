import * as console from 'console';

import type { api } from 'misskey-js';

import { BaseCommand } from '@/commands/BaseCommand/index.js';

export class DeleteAllPostsCommand extends BaseCommand {
  #targetUserId: string;
  #freeze: boolean;

  constructor({
    userId,
    freeze = false,
    client,
  }: {
    userId: string;
    freeze?: boolean;
    client: api.APIClient;
  }) {
    super({ client });
    this.#targetUserId = userId;
    this.#freeze = freeze;
  }

  override async execute() {
    try {
      console.log(`Deleting all notes for user ${this.#targetUserId}...`);
      const notes = await this.client.request('users/notes', {
        userId: this.#targetUserId,
        withFiles: true,
        limit: 100,
      });
      const noteIds = notes.map(note => note.id);
      for (const noteId of noteIds) {
        void (await new Promise(resolve => setTimeout(resolve, 500)));
        void (await this.client.request('notes/delete', {
          noteId,
        }));
      }
      console.log(`Notes delete completed.`);

      void (await this.client.request('admin/delete-all-files-of-a-user', {
        userId: this.#targetUserId,
      }));
      console.log('All files are deleted.');

      if (this.#freeze) {
        console.log(`Freezing account ${this.#targetUserId}...`);
        void (await this.client.request('admin/suspend-user', {
          userId: this.#targetUserId,
        }));
        console.log('Freeze account completed.');
      }
    } catch (error) {
      this.handleError(error as Error);
    }
  }
}
