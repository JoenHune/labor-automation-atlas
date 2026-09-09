import {defineConfig} from 'vitest/config'

export default defineConfig({
 test:{
  // Import checks each parse the complete historical corpus. Bound concurrent copies on CI and desktops.
  maxWorkers:2,
  testTimeout:15000,
 },
})
