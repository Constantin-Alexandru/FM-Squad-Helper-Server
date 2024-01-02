import * as fs from 'fs';
import Logging from './libraries/Logging';
import mongoose from 'mongoose';
import { AttributeInterface } from './model/Attribute';
import { createAttribute, getAllAttributes } from './controllers/Attribute';
import { collectionExists } from './helpers/database';
import { AttributeWeightInterface } from './model/AttributeWeight';
import { PositionsInterface } from './model/Position';
import { PlayerRoleInterface } from './model/PlayerRole';
import { createPlayerRole, getAllPlayerRoles } from './controllers/PlayeRole';
import {
  createAttributeWeight,
  getAllAttributeWeights,
} from './controllers/AttributeWeight';
import { createPosition, getAllPositions } from './controllers/Position';

export interface Data {
  attributes: Array<AttributeInterface>;
  attributeWeights: Array<AttributeWeightInterface>;
  positions: Array<PositionsInterface>;
  playerRoles: Array<PlayerRoleInterface>;
}

export async function setup(
  attributePath: string = './src/data/attributes.json',
  playerRolePath: string = './src/data/playerRoles.json',
  positionsPath: string = './src/data/positions.json'
): Promise<Data> {
  const data: Data = {
    attributes: [],
    attributeWeights: [],
    positions: [],
    playerRoles: [],
  };

  await loadAttributes(attributePath);
  data.attributes = await getAllAttributes();

  await loadPlayerRolesAndAttributeWeights(playerRolePath, data.attributes);
  data.playerRoles = await getAllPlayerRoles();
  data.attributeWeights = await getAllAttributeWeights();

  await loadPositions(positionsPath);
  data.positions = await getAllPositions();

  return data;
}

async function loadAttributes(
  path: string = './src/data/attributes.json'
): Promise<void> {
  try {
    if (await collectionExists('attributes')) return;

    Logging.log('Attribute Collection does not exist. Creating...');

    if (!fs.existsSync(path)) {
      Logging.error(
        `Attribute file at path "${path}" is not valid. Change path or make sure file exists`
      );
      return;
    }

    const attributes = JSON.parse(fs.readFileSync(path, 'utf-8'));

    const order = attributes['order'];

    order.forEach((attribute: string, index: number) => {
      console.log(attribute);
      createAttribute(attribute, index + 1, attributes[attribute]);
    });

    Logging.success('Attribute Collection created successfully.');
  } catch (error) {
    Logging.error(`Attribute Collection creation failed. Error: ${error}`);
  }
}

async function loadPlayerRolesAndAttributeWeights(
  path: string = './src/data/playerRoles.json',
  attributes: Array<AttributeInterface>
) {
  try {
    if (await collectionExists('playerroles')) return;

    Logging.log(
      'Player Roles and Attribute Weights Collections does not exist. Creating...'
    );

    if (!fs.existsSync(path)) {
      Logging.error(
        `Player Roles and Attribute Weights file at path "${path}" is not valid. Change path or make sure file exists`
      );
    }

    const playerRoles = JSON.parse(fs.readFileSync(path, 'utf-8'));

    for (const playerRole in playerRoles) {
      createPlayerRole(playerRole, playerRoles[playerRole]['name']);

      const weights: string = playerRoles[playerRole]['weights'];

      console.log(playerRoles[playerRole]['name'], weights);

      attributes.forEach((attribute, index) => {
        const weight: number = parseInt(weights[index]);

        if (weight != 0) {
          console.log(playerRoles[playerRole]['name'], attribute.id, weight);
          createAttributeWeight(playerRole, attribute.id, weight);
        }
      });
    }

    Logging.success(
      'Player Roles and Attribute Weights Collections created successfully.'
    );
  } catch (error) {
    Logging.error(
      `Player Roles and Attribute Weights Collections creation failed. Error: ${error}`
    );
  }
}

async function loadPositions(path: string = './src/data/positions.json') {
  try {
    if (await collectionExists('positions')) return;

    Logging.log('Position Collection does not exist. Creating...');

    if (!fs.existsSync(path)) {
      Logging.error(
        `Positions file at path "${path}" is not valid. Change path or make sure file exists`
      );
    }

    const positions = JSON.parse(fs.readFileSync(path, 'utf-8'));

    for (const position in positions) {
      createPosition(
        position,
        positions[position]['name'],
        positions[position]['roles']
      );
    }

    Logging.success('Position Collection created successfully.');
  } catch (error) {
    Logging.error(`Position Collection creation failed. Error: ${error}`);
  }
}
