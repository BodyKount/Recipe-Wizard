# Recipe-Wizard

## Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/BodyKount/Recipe-Wizard.git
   cd Recipe-Wizard
   ```

2. Create a `.env` file in the `Server` directory and add your API key:
   ```sh
   echo "RECIPE_API_KEY=your_api_key_here" > Server/.env
   ```

3. Install dependencies and start the server:
   ```sh
   npm install
   npm start
   ```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file in the `Server` directory:

```
RECIPE_API_KEY=your_api_key_here
```

You can use the `.env.example` file as a template:

```sh
cp Server/.env.example Server/.env
```

Then, replace `your_api_key_here` with your actual API key.