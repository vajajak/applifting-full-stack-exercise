import { Logger } from '../services';
import axios from 'axios';
import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { RecordMap } from 'relay-runtime/lib/store/RelayStoreTypes';

export const createRelayEnvironment = (records: RecordMap, accessToken?: string): Environment =>
    new Environment({
        network: Network.create(async (operation, variables) => {
            if (!process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL) {
                throw new Error('No GraphQL endpoint defined!');
            }
            console.log(process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL);

            try {
                const { data } = await axios(process.env.NEXT_PUBLIC_API_ENDPOINT_GRAPHQL, {
                    data: JSON.stringify({ query: operation.text, variables }),
                    headers: {
                        'Content-Type': 'application/json',
                        'X-LOCALE': 'cs',
                        // 'Referrer-Policy': 'strict-origin-when-cross-origin',
                        /* For getServerSideProps purposes where credentials aren't passed automatically */
                        ...(accessToken ? { Cookie: `accessToken=${accessToken}` } : {}),
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
