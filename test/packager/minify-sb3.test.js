import optimizeSb3 from '../../src/packager/minify/sb3';

const clone = (obj) => JSON.parse(JSON.stringify(obj));

const emptyTarget = () => ({
  name: '',
  blocks: {},
  comments: {},
  variables: {},
  lists: {},
  broadcasts: {},
});

test('does not throw if project does not have monitors', () => {
  const data = {
    targets: [],
    meta: {}
  };
  optimizeSb3(clone(data));
});

test('removes comments', () => {
  const data = {
    targets: [
      {
        ...emptyTarget(),
        comments: {
          "a": {
            "text": "wregoiujji"
          },
          "b": {
        // !!! CHANGE !!!
            // "text": "Configuration for https://turbowarp.org/\nDo not edit by hand\n{\"framerate\":30,\"runtimeOptions\":{\"maxClones\":300,\"miscLimits\":false,\"fencing\":true},\"interpolation\":false,\"turbo\":false,\"hq\":true} // _twconfig_"
            "text": "Configuration for https://menersar.github.io/Sidekick/\nDo not edit by hand\n{\"framerate\":30,\"runtimeOptions\":{\"maxClones\":300,\"miscLimits\":false,\"fencing\":true},\"interpolation\":false,\"turbo\":false,\"hq\":true} // _sidekickconfig_"
          },
          "c": {
            "text": " // _gamepad_"
          }
        }
      }
    ]
  };
  const optimized = optimizeSb3(clone(data));
  expect(Object.values(optimized.targets[0].comments)).toEqual([
    {
        // !!! CHANGE !!!
    //   "text": "Configuration for https://turbowarp.org/\nDo not edit by hand\n{\"framerate\":30,\"runtimeOptions\":{\"maxClones\":300,\"miscLimits\":false,\"fencing\":true},\"interpolation\":false,\"turbo\":false,\"hq\":true} // _twconfig_"
      "text": "Configuration for https://menersar.github.io/Sidekick/\nDo not edit by hand\n{\"framerate\":30,\"runtimeOptions\":{\"maxClones\":300,\"miscLimits\":false,\"fencing\":true},\"interpolation\":false,\"turbo\":false,\"hq\":true} // _sidekickconfig_"
    },
    {
      text: " // _gamepad_"
    }
  ]);
});
