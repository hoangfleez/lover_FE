import { Box } from '@mui/material'
import React from 'react'
import AccountSidebar from './AccountSidebar'
import PersonalPageSidebar from './ PersonalPageSidebar'
import WalletSidebar from './WalletSidebar'
import DonateSidebar from './DonateSidebar'
import PlayerSidebar from './PlayerSidebar'

export default function UserSiderbar() {
  const [selectedLine, setSelectedLine] = React.useState(localStorage.getItem("selectedLineKey") ?  localStorage.getItem("selectedLineKey") :1);
  const [expanded, setExpanded] = React.useState(true);
  return (
    <Box sx={{display:"flex", flexDirection:"column"}}>
      <AccountSidebar selectedLine={selectedLine} setSelectedLine={setSelectedLine} expanded={expanded} setExpanded={setExpanded} />
      <PersonalPageSidebar selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
      <PlayerSidebar  selectedLine={selectedLine} setSelectedLine={setSelectedLine} expanded={expanded} setExpanded={setExpanded}/>
      <WalletSidebar selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
      <DonateSidebar selectedLine={selectedLine} setSelectedLine={setSelectedLine}/>
    </Box>
  )
}
