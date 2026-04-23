<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Site Admin',
                'email' => 'admin@example.com',
                'is_admin' => true,
                'password' => 'password',
            ],
            [
                'name' => 'Ali Raza',
                'email' => 'ali@example.com',
                'is_admin' => false,
                'password' => 'password',
            ],
            [
                'name' => 'Sara Khan',
                'email' => 'sara@example.com',
                'is_admin' => false,
                'password' => 'password',
            ],
            [
                'name' => 'Usman Tariq',
                'email' => 'usman@example.com',
                'is_admin' => false,
                'password' => 'password',
            ],
        ];

        foreach ($users as $user) {
            User::query()->updateOrCreate(
                ['email' => $user['email']],
                [
                    'name' => $user['name'],
                    'email' => $user['email'],
                    'is_admin' => $user['is_admin'],
                    'password' => $user['password'],
                    'email_verified_at' => now(),
                ],
            );
        }
    }
}
