import {CannotAccessProjectError} from '../common/errors';
import request from '../common/request';

const getProjectMetadata = async (id) => {
  try {
    const meta = await request({
      url: [
        // `https://api.scratch.mit.edu/projects/${id}`,
        // `https://api.scratch.mit.edu/projects/${id}`

        `https://trampoline.turbowarp.org/api/projects/${id}`,
        `https://trampoline.turbowarp.xyz/api/projects/${id}`
      ],
      type: 'json'
    });
    return {
      title: meta.title,
      token: meta.project_token
    };
  } catch (e) {
    if (e && e.status === 404) {
      throw new CannotAccessProjectError(`Cannot access project ${id}`);
    }
    throw e;
  }
};

export default getProjectMetadata;
