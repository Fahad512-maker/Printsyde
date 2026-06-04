<?php

namespace App\Http\Controllers;

use App\Services\HomePageService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private HomePageService $homePageService) {}

    public function index(): Response
    {
        return Inertia::render('Home', $this->homePageService->getHomePageProps());
    }

    public function about(): Response
    {
        return Inertia::render('About/About');
    }

    public function collections(): Response
    {
        return Inertia::render('Collections/Index', $this->homePageService->getCollectionPageProps());
    }

    public function design(): Response
    {
        return Inertia::render('ComingSoon');
    }

    public function howItWorks(): Response
    {
        return Inertia::render('HowItWorks');
    }
}
