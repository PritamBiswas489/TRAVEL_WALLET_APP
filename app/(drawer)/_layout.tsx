import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{ drawerLabel: 'Home Tabs', title: 'Dashboard' }}
      />
      <Drawer.Screen
        name="login"
        options={{ drawerLabel: 'Login', title: 'Login' }}
      />
      <Drawer.Screen
        name="verification"
        options={{ drawerLabel: 'Verification', title: 'Verification' }}
      />
       <Drawer.Screen
        name="forget-password"
        options={{ drawerLabel: 'Forget Password', title: 'Forget Password' }}
      />
       <Drawer.Screen
        name="verify-yourself"
        options={{ drawerLabel: 'Verify Yourself', title: 'Verify Yourself' }}
      />

       <Drawer.Screen
        name="page1"
        options={{ drawerLabel: 'New page', title: 'New page' }}
      />


    </Drawer>
  );
}
