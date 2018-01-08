const testsContext = require.context('./specs', true, /\.specs$/)
testsContext.keys().forEach(testsContext)
