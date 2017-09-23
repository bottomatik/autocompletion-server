# Autocomplete Bottomatik
## A simple autocompletion server based on express capable of separating completions by system

#### Installation
Clone this repository and run:

`npm install`

The only requirements are `express`, `cors` and `body-parser`.

## API

All requests are performed using `Content-Type: application/json` .

### `POST` `/:id`

Requires autocompletion data for system with id `id`.

| Parameters | Required | Type |Description |
|:----------:|:--------:|:----:|:----------:|
| `query` | `true` | String | The query. Example: `What is my` |


### `GET` `/:id/full`

Requires all data from system. No parameters.

### `POST` `/new/:id`

Creates a new system to work on.
Note that systems are immutable. Feel free to add a PUT request to add to current array.

| Parameters | Required | Type |Description |
|:----------:|:--------:|:----:|:----------:|
| `data` | `true` | Array | All possible autocompletions. Example: ["What's my social secutiry number", "What's my IP address"]|

