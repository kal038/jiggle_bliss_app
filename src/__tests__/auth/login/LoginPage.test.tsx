import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/'
import LoginPage from '@/app/(unprotected)/auth/login/page'
import { describe } from 'node:test'

describe('LoginPage', () => {
    beforeEach(() => {
        render(<LoginPage />)
    })

    describe('Email Validation', () => {
        it('shows error for empty email', async () => {
            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(screen.getByText('Email is required')).toBeInTheDocument()
        })

        it('shows error for invalid email format', async () => {
            const emailInput = screen.getByPlaceholderText('Email address')
            fireEvent.change(emailInput, { target: { value: 'invalid-email' } })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(screen.getByText('Invalid email format')).toBeInTheDocument()
        })

        it('accepts valid email', async () => {
            const emailInput = screen.getByPlaceholderText('Email address')
            fireEvent.change(emailInput, {
                target: { value: 'test@example.com' },
            })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(
                screen.queryByText('Invalid email format')
            ).not.toBeInTheDocument()
        })
    })

    describe('Password Validation', () => {
        it('shows error for empty password', async () => {
            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(screen.getByText('Password is required')).toBeInTheDocument()
        })

        it('shows error for password without uppercase', async () => {
            const passwordInput = screen.getByPlaceholderText('Password')
            fireEvent.change(passwordInput, {
                target: { value: 'password123!' },
            })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(
                screen.getByText(/must contain at least one uppercase letter/)
            ).toBeInTheDocument()
        })

        it('shows error for password without number', async () => {
            const passwordInput = screen.getByPlaceholderText('Password')
            fireEvent.change(passwordInput, { target: { value: 'Password!' } })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(screen.getByText(/must contain.*number/)).toBeInTheDocument()
        })

        it('accepts valid password', async () => {
            const passwordInput = screen.getByPlaceholderText('Password')
            fireEvent.change(passwordInput, {
                target: { value: 'Password123!' },
            })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            expect(screen.queryByText(/must contain/)).not.toBeInTheDocument()
        })
    })

    describe('Form Submission', () => {
        it('shows success message with valid inputs', async () => {
            const emailInput = screen.getByPlaceholderText('Email address')
            const passwordInput = screen.getByPlaceholderText('Password')

            fireEvent.change(emailInput, {
                target: { value: 'test@example.com' },
            })
            fireEvent.change(passwordInput, {
                target: { value: 'Password123!' },
            })

            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })
            fireEvent.click(submitButton)

            await waitFor(() => {
                expect(screen.getByText(/Check your email/)).toBeInTheDocument()
            })
        })

        it('disables form during submission', async () => {
            const emailInput = screen.getByPlaceholderText('Email address')
            const passwordInput = screen.getByPlaceholderText('Password')
            const submitButton = screen.getByRole('button', {
                name: /sign in/i,
            })

            fireEvent.change(emailInput, {
                target: { value: 'test@example.com' },
            })
            fireEvent.change(passwordInput, {
                target: { value: 'Password123!' },
            })
            fireEvent.click(submitButton)

            expect(submitButton).toBeDisabled()
            expect(emailInput).toBeDisabled()
            expect(passwordInput).toBeDisabled()
        })
    })
})
