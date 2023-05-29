import NextAuth from 'next-auth'

const handler = NextAuth({
  providers: [
    {
      id: 'infojobs',
      name: 'Infojobs',
      type: 'oauth',
      clientId: process.env.INFOJOBS_CLIENT_ID,
      clientSecret: process.env.INFOJOBS_CLIENT_SECRET,

      /** does not implements OpenId */
      // wellKnown: "https://accounts.google.com/.well-known/openid-configuration",
      // userinfo: "https://",
      // authorizationUrl: "https://auth.freshbooks.com/service/auth/oauth/authorize?response_type=code",
      authorization: {
        url: 'https://www.infojobs.net/api/oauth/user-authorize/index.xhtml',
        params: {
          scope:
            'MY_APPLICATIONS,CANDIDATE_PROFILE_WITH_EMAIL,CANDIDATE_READ_CURRICULUM_SKILLS,CV',
          // client_id: process.env.INFOJOBS_CLIENT_ID,
          redirect_uri: process.env.INFOJOBS_REDIRECT_URI,
          response_type: 'code'
          // state: 'OPTIONAL_CLIENT_LOCAL_STATE'
        }
      },
      token: 'https://www.infojobs.net/oauth/authorize',
      // token: {
      //   url: 'https://www.infojobs.net/oauth/authorize',
      //   params: {
      //     grant_type: 'authorization_code',
      //     client_id: process.env.INFOJOBS_CLIENT_ID,
      //     client_secret: process.env.INFOJOBS_CLIENT_SECRET,
      //     code: 'VERIFICATION_CODE_AQUIRED_IN_STEP_1',
      //     redirect_uri: process.env.INFOJOBS_REDIRECT_URI
      //   }
      // },
      // profileUrl: "https://api.freshbooks.com/auth/api/v1/users/me",

      profile(profile) {
        console.log('--PROFILE: ', profile)
        return {
          id: profile.id
          // name: profile.kakao_account?.profile.nickname,
          // email: profile.kakao_account?.email,
          // image: profile.kakao_account?.profile.profile_image_url
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
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('CB-jwt: ', { token, user, account, profile, isNewUser })
      return token
    }
  }
})

export { handler as GET, handler as POST }
