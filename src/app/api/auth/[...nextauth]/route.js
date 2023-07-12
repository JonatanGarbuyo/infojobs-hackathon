import NextAuth from 'next-auth'

const AUTHORIZATION_URL =
  'https://www.infojobs.net/api/oauth/user-authorize/index.xhtml'
const SCOPE =
  'MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV'
const TOKEN_URL = 'https://www.infojobs.net/oauth/authorize'

const handler = NextAuth({
  providers: [
    {
      id: 'infojobs',
      name: 'Infojobs',
      type: 'oauth',
      version: '2.0',
      checks: ['none'],
      clientId: process.env.INFOJOBS_CLIENT_ID,
      clientSecret: process.env.INFOJOBS_CLIENT_SECRET,
      authorization: {
        url: AUTHORIZATION_URL,
        params: {
          scope: SCOPE,
          redirect_uri: process.env.INFOJOBS_REDIRECT_URI,
          response_type: 'code'
          // state: 'OPTIONAL_CLIENT_LOCAL_STATE'
        }
      },
      token: {
        url: TOKEN_URL,
        async request({ params }) {
          const tokenUrl = new URL(TOKEN_URL ?? '')
          tokenUrl.searchParams.append('grant_type', 'authorization_code')
          tokenUrl.searchParams.append('code', params.code ?? '')
          tokenUrl.searchParams.append(
            'redirect_uri',
            `${process.env.INFOJOBS_REDIRECT_URI}` ?? ''
          )
          tokenUrl.searchParams.append(
            'client_id',
            process.env.INFOJOBS_CLIENT_ID ?? ''
          )
          tokenUrl.searchParams.append(
            'client_secret',
            process.env.INFOJOBS_CLIENT_SECRET ?? ''
          )
          const response = await fetch(tokenUrl.toString(), {
            method: 'POST'
          })
          const tokens = await response.json()
          return {
            tokens
          }
        },
        // userinfo: {
        //   async request({ tokens }) {
        //     const basicToken = `Basic ${Buffer.from(
        //       `${process.env.INFOJOBS_CLIENT_ID}:${process.env.INFOJOBS_CLIENT_SECRET}`
        //     ).toString('base64')}`
        //     const bearerToken = `Bearer ${tokens.access_token}`
        //     const response = await fetch(
        //       'https://api.infojobs.net/api/6/candidate',
        //       {
        //         headers: {
        //           Authorization: `${basicToken},${bearerToken}`
        //         }
        //       }
        //     )
        //     const profile = await response.json()
        //     return {
        //       id: profile.id,
        //       email: profile.email,
        //       image: profile.photo,
        //       name: profile.name,
        //       sub: profile.id
        //     }
        //   }
        // },
        profile(profile) {
          return {
            id: profile.id.toString(),
            name: profile.name,
            email: profile.email,
            image: profile.photo
          }
        }
      },

      profile(profile) {
        console.log('--PROFILE: ', profile)
        return {
          id: profile.id,
          profile: profile
        }
      }
    }
  ],

  /** Callbacks are asynchronous functions you can use to control what happens when an action is performed.
   * Callbacks are extremely powerful, especially in scenarios involving JSON Web Tokens as they allow you
   * to implement access controls without a database and to integrate with external databases or APIs.
   * You can specify a handler for any of the callbacks below.
   **/
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('CB-signIn: ', { user, account, profile, email, credentials })
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('CB-redirect: ', { url, baseUrl })
      return baseUrl
    },
    async session({ session, token, user }) {
      console.log('CB-session: ', { session, token, user })
      session.accessToken = token.accessToken
      session.refreshToken = token.refreshToken
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('CB-jwt: ', { token, user, account, profile, isNewUser })
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    }
  }
})

export { handler as GET, handler as POST }
