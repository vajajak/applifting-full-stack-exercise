import { Logger } from '../services';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

export const createRelayEnvironment = (records: RecordMap, onServer?: boolean): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            const correctEndpoint = onServer
                ? process.env.API_ENDPOINT_GRAPHQL
                : process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL;

            if (!correctEndpoint) {
                throw new Error('No GraphQL endpoint defined!');
            }

            try {
                const { data } = await axios(correctEndpoint, {
                    data: JSON.stringify({ query: operation.text, variables }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-LOCALE': 'cs',
                    },
                    method: 'POST',
                    withCredentials: true,
                });
                return data;
            } catch (e) {
                Logger.log('ERROR');
                Logger.log(operation.text?.substr(0, 200), variables);
                Logger.error(e);
            }
        }),
        store: new Store(new RecordSource(records)),
        isServer: true,
    });
