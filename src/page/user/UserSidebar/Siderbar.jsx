import { Box } from '@mui/material'
import React from 'react'
import AccountSidebar from './AccountSidebar'
import PersonalPageSidebar from './ PersonalPageSidebar'
import WalletSidebar from './WalletSidebar'
import DonateSidebar from './DonateSidebar'
import PlayerSidebar from './PlayerSidebar'

export default function UserSiderbar() {
  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <AccountSidebar/>
      <PersonalPageSidebar/>
      <WalletSidebar/>
      <PlayerSidebar/>
      <DonateSidebar/>
    </Box>
  )
}
