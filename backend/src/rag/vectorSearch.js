import ResumeChunk
from "../models/ResumeChunk.js";

import { createEmbedding }
from "./embeddingService.js";

export const searchResumeContext =
  async (query) => {
    const queryEmbedding =
      await createEmbedding(query);

    const results =
      await ResumeChunk.aggregate([
        {
          $vectorSearch: {
            index:
              "resume_vector_index",

            path: "embedding",

            queryVector:
              queryEmbedding,

            numCandidates: 50,

            limit: 5,
          },
        },
      ]);

    return results;
  };