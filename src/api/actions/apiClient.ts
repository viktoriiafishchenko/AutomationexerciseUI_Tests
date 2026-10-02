import { APIRequestContext, expect } from '@playwright/test';

export default class ApiClient {
    constructor(private readonly request: APIRequestContext) { }

    async getToken(): Promise<string> {
        await this.request.get('https://automationexercise.com/');
        const state = await this.request.storageState();
        const csrfToken = state.cookies.find(
            cookie => cookie.name === 'csrftoken'
        )?.value;

        if (!csrfToken) {
            throw new Error('Token was not found');

        }
        return csrfToken;
    }

    async getCsrfMiddlewareToken(): Promise<string> {
        const response = await this.request.get('https://automationexercise.com/signup');

        const html = await response.text();

        const match = html.match(
            /name="csrfmiddlewaretoken"\s+value="([^"]+)"/
        );

        if (!match) {
            throw new Error('csrfmiddlewaretoken was not found');
        }

        return match[1];
    }

    async setUserInfo(name: string, email: string, token: string): Promise<void> {
        const csrfToken = await this.getCsrfMiddlewareToken();

        const formData = new URLSearchParams();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('form_type', "signup");
        formData.append('csrfmiddlewaretoken', csrfToken);

        const response = await this.request.post('https://automationexercise.com/signup', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': 'https://automationexercise.com/signup',
                'set-cookie': `csrftoken=${token};  expires=Tue, 21 Sep 2027 13:42:38 GMT; Max-Age=31449600; Path=/; SameSite=Lax`
            },
            data: formData.toString(),
            maxRedirects: 0

        });

        expect(response.status()).toBe(200);
    }

    async setAllUserInfo(
        name: string,
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        token: string
    ): Promise<void> {

        const csrfToken = await this.getCsrfMiddlewareToken();

        const formData = new URLSearchParams();

        formData.append('name', name);
        formData.append('email_address', email);
        formData.append('form_type', 'create_account');
        formData.append('csrfmiddlewaretoken', csrfToken);
        formData.append('password', password);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('address1', '123 Main St');
        formData.append('country', 'United States');
        formData.append('state', 'California');
        formData.append('city', 'Los Angeles');
        formData.append('zipcode', '90001');
        formData.append('mobile_number', '1234567890');

        const response = await this.request.post(
            'https://automationexercise.com/signup',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'https://automationexercise.com/signup',
                    'set-cookie': `csrftoken=${token}; Path=/; SameSite=Lax`
                },
                data: formData.toString(),
                maxRedirects: 0
            }
        );
        expect(response.status()).toBe(302);
    }

    async loginUser(email: string, password: string): Promise<void> {
        const csrfToken = await this.getCsrfMiddlewareToken();

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('form_type', 'login');
        formData.append('csrfmiddlewaretoken', csrfToken);

        const response = await this.request.post(
            'https://automationexercise.com/login',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'https://automationexercise.com/login'
                },
                data: formData.toString(),
                maxRedirects: 0
            }
        );

        const state = await this.request.storageState();

        for (const cookie of state.cookies) {
            console.log(cookie.name, '=', cookie.value);
        }

        expect(response.status()).toBe(302);
    }

    async deleteUserAccount(token: string): Promise<void> {

        const storageState = await this.request.storageState();

        const sessionId = storageState.cookies.find(
            cookie => cookie.name === 'sessionid'
        )?.value;

        const response = await this.request.get(
            'https://automationexercise.com/delete_account',
            {
                headers: {
                    Cookie: `csrftoken=${token}; sessionid=${sessionId}`,
                    Referer: 'https://automationexercise.com/view_cart',
                },
                maxRedirects: 0,
            }
        );
        expect(response.status()).toBe(200);
    }

    async loginUserAccount(email: string, password: string): Promise<void> {
        const csrfToken = await this.getCsrfMiddlewareToken();

        const formData = new URLSearchParams();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('form_type', 'login');
        formData.append('csrfmiddlewaretoken', csrfToken);

        const response = await this.request.post(
            'https://automationexercise.com/login',
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Referer': 'https://automationexercise.com/login'
                },
                data: formData.toString(),
                maxRedirects: 0
            }
        );

        expect(response.status()).toBe(302);
    }
}