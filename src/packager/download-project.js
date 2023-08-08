
    import {wrap} from 'comlink';
    const createWorker = () => {
      
        const worker = new Worker(__webpack_public_path__ + "js/download-project.b2fbf3b205f351ccd306.worker.js");
      
      return new Promise((resolve, reject) => {
        const terminate = () => {
          worker.terminate();
        };
        const onMessage = (e) => {
          if (e.data === 'ready') {
            cleanup();
            resolve({
              worker: wrap(worker),
              terminate
            });
          }
        };
        const onError = () => {
          cleanup();
          reject(new Error("Worker js/download-project.b2fbf3b205f351ccd306.worker.js failed to load. Usually this will be fixed after refreshing."));
        };
        const cleanup = () => {
          worker.removeEventListener('message', onMessage);
          worker.removeEventListener('error', onError);
        };
        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);
      });
    };
    export default createWorker;
    