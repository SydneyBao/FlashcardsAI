'use client'
import Image from "next/image";
import Head from "next/head";  // Import Head from next/head
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { AppBar, Toolbar, Typography, Container, Button, Box, Grid} from "@mui/material";  // Remove Head from here

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if(checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcards using AI" />
      </Head>
      <Container maxWidth="100vw">
        <AppBar position="static">
          <Toolbar>
            <Typography variant='h6' style={{flexGrow: 1}}>Flashcards</Typography>
            <SignedOut>
              <Button color="inherit" href="/sign-in">Login</Button>
              <Button color="inherit" href="/sign-up">Sign Up</Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Toolbar>
        </AppBar>

        <Box sx={{textAlign: 'center', my: 4}}>
          <Typography variant = "h2" gutterBottom>Welcome to your flashcards</Typography>
          <Typography variant="h5" gutterBottom>
            {' '}
            The easiest way to make flashcards from your text
          </Typography>
          <Button variant = 'contained' color = 'primary' sx = {{mt: 2}} href="/generate">Get Started</Button>
        </Box>
        <Box sx = {{my: 6}}>
          <Typography variant = "h4" gutterBottom>Features</Typography>
          <Grid container spacing = {4}>
            <Grid item xs={12} md = {4}>
              <Typography variant = "h6" gutterBottom>Easy Text Input</Typography>
              <Typography>
                {' '}
                Simply input your text
              </Typography>
            </Grid>
            <Grid item xs={12} md = {4}>
              <Typography variant = "h6" gutterBottom>Easy Text Input</Typography>
              <Typography>
                {' '}
                Simply input your text
              </Typography>
            </Grid>
            <Grid item xs={12} md = {4}>
              <Typography variant = "h6" gutterBottom>Easy Text Input</Typography>
              <Typography>
                {' '}
                Simply input your text
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{my: 6, textAlign: 'center'}}>
          <Typography variant = "h4" gutterBottom>Pricing</Typography>
          <Grid container spacing = {4}>
            <Grid item xs={12} md = {6}>
              <Box sx={{p: 3, border: '1px solid', borderColor: 'grey', borderRadius: 2}}>
                <Typography variant="h5" gutterBottom>Basic</Typography>
                <Typography variant="h6" gutterBottom>$5/month</Typography>
                <Typography>
                  {' '}
                  Access to basic flashcard features and limited storage
                </Typography>
                <Button variant = "contained" color = "primary" sx={{mt: 2}}>Choose Basic</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md = {6}>
              <Box sx={{p: 3, border: '1px solid', borderColor: 'grey', borderRadius: 2}}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10/month</Typography>
                <Typography>
                  {' '}
                  Unlimited flashcards and storage
                </Typography>
                <Button variant = "contained" color = "primary" sx={{mt: 2}} onClick={handleSubmit}>Choose Pro</Button>
              </Box>
            </Grid>
            {/* <Grid item xs={12} md = {4}>
              <Typography variant = "h6">Easy Text Input</Typography>
              <Typography>
                {' '}
                Simply input your text
              </Typography>
            </Grid>*/}
          </Grid> 
        </Box>
      </Container>
    </>
  );
}