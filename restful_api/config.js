/**
 * Create and export configuration variables
 * 
 */

// Container for all the environments
let environments = {};

// Staging (default) environment
environments.staging = {
    'port': 3000,
    'envName': 'staging'
};

// Production environment
environments.production = {
    'port': 5000,
    'envName': 'production'
};

// Determine which environment was passed as a command-line argument
let currentEnviroment = typeof(process.env.NODE_ENV) == 'string' ?
    process.env.NODE_ENV.toLocaleLowerCase() : '';

// Check that the current environments is one of the environments above,
// if not, default to staging
let environmentToExport = typeof(environments[currentEnviroment]) == 'object' ?
    environments[currentEnviroment] : environments.staging;

// Export the module
module.exports = environmentToExport;