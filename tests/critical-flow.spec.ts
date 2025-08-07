import { test, expect } from '@playwright/test';

test('critical user flow', async ({ page }) => {
  // Navigate to the landing page
  await page.goto('/');
  await expect(page).toHaveTitle(/Projeto Gênesis/);

  // Go to registration
  await page.getByRole('link', { name: 'Cadastre-se' }).click();
  await expect(page).toHaveURL('/register');

  // Register a new user
  const uniqueEmail = `testuser_${Date.now()}@example.com`;
  await page.getByPlaceholder('Nome').fill('Test User');
  await page.getByPlaceholder('Email').fill(uniqueEmail);
  await page.getByPlaceholder('Senha').fill('password123');
  await page.getByRole('button', { name: 'Cadastre-se' }).click();
  await expect(page).toHaveURL('/dashboard');

  // Create a new site
  await page.getByRole('button', { name: '+ Novo Site' }).click();
  await expect(page.getByText('Editor Conversacional')).toBeVisible();

  // Generate site with AI
  const editorURL = page.url();
  await page.getByPlaceholder('Ex: Mude o título para \'Minha Nova Loja\'...').fill('Crie um site para uma cafeteria chamada Café Estrela, com um subtítulo e um bloco de texto.');
  await page.getByRole('button', { name: 'Enviar mensagem' }).click();

  // Wait for AI response and check content
  await expect(page.getByText('Café Estrela')).toBeVisible({ timeout: 20000 });
  await expect(page.getByText('O melhor café da cidade')).toBeVisible();

  // Save the site
  await page.getByRole('button', { name: 'Salvar' }).click();
  await expect(page.getByText('Site salvo com sucesso!')).toBeVisible();

  // Go to settings and publish
  const siteId = editorURL.split('/').pop();
  await page.goto(`/dashboard/${siteId}/settings`);
  await expect(page.getByRole('heading', { name: 'Configurações do Site' })).toBeVisible();

  const subdomain = `cafe-estrela-${Date.now()}`;
  await page.getByLabel('Subdomínio').fill(subdomain);
  await page.getByRole('button', { name: 'Salvar Configurações' }).click();
  await expect(page.getByText('Configurações salvas com sucesso!')).toBeVisible();

  // Verify the published site
  await page.getByRole('link', { name: `http://${subdomain}.genesis.app` }).click();
  await expect(page.getByText('Café Estrela')).toBeVisible();
  await expect(page.getByText('O melhor café da cidade')).toBeVisible();
});
